'use client';

import { useCallback } from 'react';
import { List, AutoSizer, WindowScroller } from 'react-virtualized';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  content: string;
}

interface VirtualizedListProps {
  items: ListItem[];
  rowHeight?: number;
  onItemClick?: (item: ListItem) => void;
}

export default function VirtualizedList({
  items,
  rowHeight = 100,
  onItemClick,
}: VirtualizedListProps) {
  const theme = useTheme();

  const rowRenderer = useCallback(
    ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
      const item = items[index];
      
      return (
        <motion.div
          key={key}
          style={style}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onItemClick?.(item)}
        >
          <Paper
            sx={{
              m: 1,
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: theme.shadows[8],
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            {item.subtitle && (
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {item.subtitle}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {item.content}
            </Typography>
          </Paper>
        </motion.div>
      );
    },
    [items, onItemClick, theme]
  );

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <AnimatePresence>
                <List
                  autoHeight
                  height={height || 0}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={items.length}
                  rowHeight={rowHeight}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  width={width}
                  overscanRowCount={3}
                />
              </AnimatePresence>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </Box>
  );
} 