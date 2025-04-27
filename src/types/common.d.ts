type RectSize = {
  width: number;
  height: number;
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

type Styles = {
  [key: string]: ReturnType<typeof css>;
};
