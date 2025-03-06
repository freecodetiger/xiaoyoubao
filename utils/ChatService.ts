import axios from 'axios';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
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

  static async sendMessageToKimi(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const response = await axios.post(
        'https://api.moonshot.cn/v1/chat/completions',
        {
          model: 'moonshot-v1-32k',
          messages,
          temperature: 0.8
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.KIMI_API_KEY}`
          }
        }
      )
      
      return {
        content: response.data.choices[0].message.content
      }
    } catch (error) {
      console.error('Kimi API调用错误:', error)
      return {
        content: '抱歉，服务器出现错误，请稍后再试。',
        error: error instanceof Error ? error.message : '未知错误'
      }
    }
  }

  static async sendMessageToBaidu(message: string): Promise<ChatResponse> {
    try {
      const response = await axios.post(
        `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${this.BAIDU_ACCESS_TOKEN}`,
        {
          messages: [{ role: 'user', content: message }]
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

  static async sendMessage(modelType: ModelType, messages: ChatMessage[], lastMessage: string): Promise<ChatResponse> {
    if (modelType === ModelType.KIMI) {
      return this.sendMessageToKimi(messages);
    } else {
      return this.sendMessageToBaidu(lastMessage);
    }
  }
} 