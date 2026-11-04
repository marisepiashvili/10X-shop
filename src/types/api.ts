// one shape for every piece of async data: a component switches on `status`,
// and TypeScript only allows `data` in the success branch and `message` in the error branch
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string; httpStatus?: number }
