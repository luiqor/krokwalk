import React from "react";
import { getConstraintsValidationSchema } from "shared";
import { Button } from "@mui/material";

import { useAppForm } from "~/libs/hooks/hooks.js";

import { TimeDurationPicker } from "./libs/components/components.js";

import styles from "./constraints-form.module.css";

type ConstraintsProps = {
  maxDuration: number;
};

type Props = {
  minHours: number;
  minMinutes: number;
};

const ConstraintsForm: React.FC<Props> = ({ minHours, minMinutes }) => {
  useAppForm<ConstraintsProps>({
    defaultValues: {
      maxDuration: 0,
    },
    validationSchema: getConstraintsValidationSchema,
  });

  return (
    <form className={styles.form}>
      <div className={styles.contentBox}>
        <h3>Select constraints</h3>
        <TimeDurationPicker minHours={minHours} minMinutes={minMinutes} />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export { ConstraintsForm };
