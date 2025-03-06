import axios from 'axios';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ContentItem[];
}

export interface ContentItem {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface FileAttachment {
  type: 'image' | 'document' | 'text';
  name: string;
  content: string; // base64编码的文件内容
  mimeType: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export enum ModelType {
  KIMI = 'kimi',
  BAIDU = 'baidu'
}

export class ChatService {
  private static readonly KIMI_API_KEY = 'sk-eE6fKsNBZi76KgnnO1vJ5eGu35NWWOu6I1Gz911B3CvQqlpp'
  private static readonly BAIDU_ACCESS_TOKEN = '24.1caea75d49c9b23728e6112c93f27ca2.2592000.1742829187.282335-117681134'

  static async analyzeImage(base64Image: string): Promise<string> {
    try {
      // 移除base64前缀
      const imageData = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      
      const response = await axios.post(
        `https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${this.BAIDU_ACCESS_TOKEN}`,
        {
          image: imageData
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      if (response.data.result && response.data.result.length > 0) {
        const descriptions = response.data.result.map((item: any) => 
          `${item.keyword}(可能性：${Math.floor(item.score * 100)}%)`
        ).join('、')
        return `这张图片可能包含：${descriptions}`
      }
      
      return '抱歉，我无法识别这张图片的内容。'
    } catch (error) {
      console.error('图像识别错误:', error)
      return '图像识别服务出现错误，请稍后重试。'
    }
  }

  static async processFile(file: File): Promise<FileAttachment | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (!event.target || !event.target.result) {
          resolve(null);
          return;
        }
        
        const content = event.target.result.toString();
        const fileType = file.type;
        
        let type: 'image' | 'document' | 'text';
        
        if (fileType.startsWith('image/')) {
          type = 'image';
          // 确保图片内容是base64格式
          console.log('图片内容前缀:', content.substring(0, 50));
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                  fileType === 'application/msword') {
          type = 'document';
        } else if (fileType === 'text/plain' || file.name.endsWith('.txt')) {
          type = 'text';
        } else {
          resolve(null);
          return;
        }
        
        resolve({
          type,
          name: file.name,
          content,
          mimeType: fileType
        });
      };
      
      reader.onerror = () => {
        resolve(null);
      };
      
      reader.readAsDataURL(file);
    });
  }

  static async sendMessageToKimi(messages: ChatMessage[], fileAttachment?: FileAttachment): Promise<ChatResponse> {
    try {
      // 处理之前的消息，确保格式一致
      let processedMessages = messages.map(msg => {
        // 如果不是最后一条消息，确保内容是字符串
        return {
          role: msg.role,
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
        };
      });
      
      // 获取最后一条用户消息
      const lastUserMessage = processedMessages[processedMessages.length - 1];
      
      // 如果有文件附件，添加到消息中
      if (fileAttachment) {
        if (fileAttachment.type === 'image') {
          // 对于图片，使用正确的vision模型格式
          console.log('处理图片附件:', fileAttachment.name);
          
          // 创建一个新的消息，包含文本和图片
          const multimodalMessage = {
            role: "user" as const,
            content: [
              {
                type: "text",
                text: lastUserMessage.content
              },
              {
                type: "image_url",
                image_url: {
                  url: fileAttachment.content
                }
              }
            ]
          };
          
          // 替换最后一条消息
          processedMessages[processedMessages.length - 1] = multimodalMessage as any;
          
          console.log('多模态消息已创建:', JSON.stringify(multimodalMessage, null, 2));
        } else if (fileAttachment.type === 'text') {
          // 对于文本文件，添加文件内容
          console.log('处理文本附件:', fileAttachment.name);
          const textContent = fileAttachment.content.startsWith('data:') 
            ? atob(fileAttachment.content.split(',')[1]) 
            : fileAttachment.content;
          
          lastUserMessage.content = `${lastUserMessage.content}\n\n文件 ${fileAttachment.name} 的内容：\n${textContent}`;
        } else if (fileAttachment.type === 'document') {
          // 对于Word文档，添加提示
          console.log('处理文档附件:', fileAttachment.name);
          lastUserMessage.content = `${lastUserMessage.content}\n\n我上传了一个Word文档：${fileAttachment.name}，请帮我分析其中的内容。`;
        }
      }
      
      console.log('发送到Kimi的消息数量:', processedMessages.length);
      
      // 检查消息格式
      processedMessages.forEach((msg, index) => {
        console.log(`消息 ${index} 角色:`, msg.role);
        if (Array.isArray(msg.content)) {
          console.log(`消息 ${index} 是多模态内容，包含 ${msg.content.length} 个元素`);
        } else {
          console.log(`消息 ${index} 是文本内容，长度: ${(msg.content as string).length}`);
        }
      });
      
      const requestBody = {
        model: 'moonshot-v1-128k-vision-preview',
        messages: processedMessages,
        temperature: 0.8
      };
      
      console.log('请求体结构:', JSON.stringify({
        model: requestBody.model,
        messagesCount: requestBody.messages.length,
        temperature: requestBody.temperature
      }));
      
      const response = await axios.post(
        'https://api.moonshot.cn/v1/chat/completions',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.KIMI_API_KEY}`
          }
        }
      );
      
      console.log('Kimi API响应状态:', response.status);
      
      return {
        content: response.data.choices[0].message.content
      }
    } catch (error) {
      console.error('Kimi API调用错误:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('请求配置:', JSON.stringify({
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }));
        
        if (error.response) {
          console.error('响应状态:', error.response.status);
          console.error('响应数据:', JSON.stringify(error.response.data));
          
          let errorMessage = '服务器返回错误';
          try {
            if (typeof error.response.data === 'object' && error.response.data.error) {
              errorMessage = error.response.data.error.message || errorMessage;
            }
          } catch (e) {
            console.error('解析错误信息失败:', e);
          }
          
          return {
            content: `抱歉，${errorMessage}`,
            error: errorMessage
          };
        } else if (error.request) {
          console.error('请求已发送但没有收到响应');
          return {
            content: '抱歉，服务器没有响应，请检查网络连接。',
            error: '请求超时或网络问题'
          };
        }
      }
      
      return {
        content: '抱歉，发送图片时出现错误，请稍后再试。',
        error: error instanceof Error ? error.message : '未知错误'
      }
    }
  }

  static async sendMessageToBaidu(message: string, fileAttachment?: FileAttachment): Promise<ChatResponse> {
    try {
      let processedMessage = message;
      
      // 如果有文件附件，添加到消息中
      if (fileAttachment) {
        if (fileAttachment.type === 'image') {
          // 对于图片，使用百度的图像识别API
          const imageData = fileAttachment.content.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
          const imageAnalysis = await this.analyzeImage(fileAttachment.content);
          processedMessage = `${processedMessage}\n\n${imageAnalysis}`;
        } else if (fileAttachment.type === 'text') {
          // 对于文本文件，添加文件内容
          const textContent = fileAttachment.content.startsWith('data:') 
            ? atob(fileAttachment.content.split(',')[1]) 
            : fileAttachment.content;
          
          processedMessage = `${processedMessage}\n\n文件 ${fileAttachment.name} 的内容：\n${textContent}`;
        } else if (fileAttachment.type === 'document') {
          // 对于Word文档，添加提示
          processedMessage = `${processedMessage}\n\n我上传了一个Word文档：${fileAttachment.name}，请帮我分析其中的内容。`;
        }
      }
      
      const response = await axios.post(
        `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${this.BAIDU_ACCESS_TOKEN}`,
        {
          messages: [{ role: 'user', content: processedMessage }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      return {
        content: response.data.result
      }
    } catch (error) {
      console.error('百度API调用错误:', error)
      return {
        content: '抱歉，服务器出现错误，请稍后再试。',
        error: error instanceof Error ? error.message : '未知错误'
      }
    }
  }

  static async sendMessage(
    modelType: ModelType, 
    messages: ChatMessage[], 
    lastMessage: string,
    fileAttachment?: FileAttachment
  ): Promise<ChatResponse> {
    if (modelType === ModelType.KIMI) {
      return this.sendMessageToKimi(messages, fileAttachment);
    } else {
      return this.sendMessageToBaidu(lastMessage, fileAttachment);
    }
  }
} 