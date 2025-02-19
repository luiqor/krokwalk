import { memo } from "react";
import { Button, TextField } from "@mui/material";

import { useAppForm } from "~/libs/hooks/hooks.js";

import styles from "./constraints-form.module.css";

type ConstraintsProps = {
  maxDuration: number;
};

const ConstraintsForm: React.FC = memo(() => {
  useAppForm<ConstraintsProps>({
    defaultValues: {
      maxDuration: 0,
    },
  });

  return (
    <form className={styles.form}>
      <div className={styles.contentBox}>
        <h3>Select constraints</h3>
        <TextField
          label="Provide maximum time for a walk"
          size="small"
          fullWidth
        />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
});

export { ConstraintsForm };
