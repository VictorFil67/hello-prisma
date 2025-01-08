type MessageList = {
  [status: number]: string;
};

const messageList: MessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string = messageList[status]) {
    super(message);
    this.status = status;
    // Указываем корректное имя класса ошибки
    this.name = "HttpError";
    // Сохраняем стек вызовов (опционально)
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
