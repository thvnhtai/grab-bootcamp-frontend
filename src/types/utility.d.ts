import { Message } from '../enums/message.enum';

type Styles = {
  [key: string]: ReturnType<typeof css>;
};

type NotificationType =
  | Message.SUCCESS
  | Message.INFO
  | Message.WARNING
  | Message.ERROR;

type MessageType = {
  type: NotificationType;
  message: string;
  description?: string;
};

export { Styles, NotificationType, MessageType };
