import { NextApiResponse } from "next";

export default class HttpError extends Error {
  code: number;

  constructor(message: string | undefined, code: number) {
    super(message);
    this.code = code;
  }
}

export function handleError<Data>(err: any, res: NextApiResponse<Data>) {
  if (err instanceof HttpError) {
    res.status(err.code || 500).send({
      error: err.message,
      code: err.code,
      ...(process.env.NODE_ENV == "development" && {
        stack: err.stack,
        name: err.name,
      }),
    } as unknown as Data);
  } else if (err instanceof Error) {
    res.status(500).send({
      error: err.message,
      ...(process.env.NODE_ENV == "development" && {
        stack: err.stack,
        name: err.name,
      }),
    } as unknown as Data);
  } else {
    res.send({ error: err } as unknown as Data);
  }
}
