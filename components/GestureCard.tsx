'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from 'react-use-gesture';

interface GestureCardProps {
  title: string;
  content: string;
  onSwipe?: (direction: 'left' | 'right') => void;
  onDoubleTap?: () => void;
}

export default function GestureCard({
  title,
  content,
  onSwipe,
  onDoubleTap,
}: GestureCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  // 绑定手势
  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], direction: [xDir], velocity }) => {
        setPosition({ x: down ? mx : 0, y: down ? my : 0 });
        setIsPressed(down);

        // 处理滑动结束
        if (!down && velocity > 0.2) {
          if (xDir > 0) {
            onSwipe?.('right');
          } else if (xDir < 0) {
            onSwipe?.('left');
          }
        }
      },
      onDoubleClick: () => {
        onDoubleTap?.();
      },
    },
    {
      drag: {
        initial: () => [position.x, position.y],
        rubberband: true,
      },
    }
  );

  return (
    <AnimatePresence>
      <motion.div
        {...bind()}
        style={{
          x: position.x,
          y: position.y,
          cursor: isPressed ? 'grabbing' : 'grab',
        }}
        animate={{
          scale: isPressed ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: 2,
            boxShadow: theme => 
              isPressed 
                ? theme.shadows[8]
                : theme.shadows[2],
            transition: 'box-shadow 0.3s',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              <Typography variant="caption">
                ← 左右滑动或双击 →
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
} 