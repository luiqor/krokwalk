import { useState } from "react";
import {
  Typography,
  Paper,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { TagDto } from "~/modules/tags/tags.js";
import { TourDto } from "~/modules/tours/tours.js";

import styles from "./priority-selector.module.css";

type PrioritySelectorProps = {
  title: string;
  items: TourDto[] | TagDto[];
  onChange: (selectedItems: string[]) => void;
  initialSelection?: string[];
};

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  title,
  items,
  onChange,
  initialSelection = [],
}) => {
  const [priorityItems, setPriorityItems] =
    useState<string[]>(initialSelection);

  const handleItemToggle = (item: string) => {
    setPriorityItems((prev) => {
      if (prev.includes(item)) {
        const newItems = prev.filter((t) => t !== item);
        onChange(newItems);
        return newItems;
      }
      const newItems = [...prev, item];
      onChange(newItems);
      return newItems;
    });
  };

  const moveItemUp = (index: number) => {
    if (index <= 0) return;

    const newOrder = [...priorityItems];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;

    setPriorityItems(newOrder);
    onChange(newOrder);
  };

  const moveItemDown = (index: number) => {
    if (index >= priorityItems.length - 1) return;

    const newOrder = [...priorityItems];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;

    setPriorityItems(newOrder);
    onChange(newOrder);
  };

  return (
    <div className={styles.selectionContainer}>
      <Typography variant="subtitle1" className={styles.sectionTitle}>
        {title}
      </Typography>
      <Paper elevation={0} className={styles.selectionPaper}>
        <div className={styles.chipContainer}>
          {items.map((item) => (
            <Chip
              key={item.id}
              label={item.title}
              onClick={() => handleItemToggle(item.slug)}
              className={`${styles.chip} ${
                priorityItems.includes(item.slug) ? styles.selectedChip : ""
              }`}
            />
          ))}
        </div>

        {priorityItems.length > 0 && (
          <div className={styles.priorityList}>
            <List>
              {priorityItems.map((item, index) => (
                <ListItem key={item} className={styles.priorityItem}>
                  <ListItemText primary={`${index + 1}. ${item}`} />
                  <div className={styles.priorityControls}>
                    <IconButton
                      size="small"
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                    >
                      👆
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => moveItemDown(index)}
                      disabled={index === priorityItems.length - 1}
                    >
                      👇
                    </IconButton>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {priorityItems.length === 0 && (
          <div className={styles.emptyMessage}>
            No items selected. Click on items above to add them to your priority
            list.
          </div>
        )}
      </Paper>
    </div>
  );
};

export { PrioritySelector };
