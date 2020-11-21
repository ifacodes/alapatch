import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectById, parameterUpdated } from "./parameterSlice.js";
import { Slider, SelectList } from "../../helpers/Helpers";
import styles from "./Parameters.module.css";

const ModFX = (props) => {
  const parameters = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <SelectList
        value={parameters.type}
        list={
          ({ value: "Flanger/Chorus" },
          { value: "Ensemble" },
          { value: "Phaser" })
        }
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { type: value },
            })
          )
        }
      />
      <Slider
        min={0}
        max={127}
        parameter={parameters.lfoSpeed}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { lfoSpeed: value },
            })
          )
        }
      />
      <Slider
        min={0}
        max={127}
        parameter={parameters.effectDepth}
        onChange={(value) =>
          dispatch(
            parameterUpdated({
              id: props.id,
              changes: { effectDepth: value },
            })
          )
        }
      />
    </div>
  );
};
