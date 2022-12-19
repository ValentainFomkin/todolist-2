import {v1} from "uuid";
import {TasksStateType} from "../AppWidthRedux";


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistID: string
}


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(e => e.id !== action.id)
            }
        }
        case "ADD-TASK": {
            let newTaskId = v1()
            return {
                ...state,
                [action.todolistID]: [{id: newTaskId, title: action.title, isDone: false}, ...state[action.todolistID],
                ]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(e => e.id === action.id ? {
                    ...e,
                    isDone: action.isDone
                } : e)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(e => e.id === action.id ? {
                    ...e,
                    title: action.title
                } : e)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.todolistId]
            return {
                ...state
            }

        }

        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id: id, todolistID: todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistID: todolistID} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id: id, isDone: isDone, todolistID: todolistID} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id: id, title: title, todolistID: todolistID} as const
}
export const addTodolistAC = (todolistId: string, title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todolistId: todolistId, title: title} as const
}