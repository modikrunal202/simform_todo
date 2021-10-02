export interface TaskInterface {
    task: string,
    category_id: number,
    user_id?: number,
    is_active?: number,
    is_deleted?: number
}