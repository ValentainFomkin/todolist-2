import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const TaskWidthRedux = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()


    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistID));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistID));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistID));
    }


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})
