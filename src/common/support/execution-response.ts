
export class ExecutionResponse<T>
{
    data:any;
    errors:ResponseError[]
}

export class ResponseError{
    message:string;
    locations:Location[];
    path: string[];
}

export class Location{
    line: number;
    column: number;
  }