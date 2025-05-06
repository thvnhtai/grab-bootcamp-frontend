import { Message } from '../enums/message.enum';

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

type SortByOption = 'score' | 'rating' | 'distance';

type Filters = {
  searchTerm: string;
  sortBy: SortByOption;
  minRating: number;
};

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  metadata?: {
    page: number;
    size: number;
    total: number;
  };
};

type ErrorPayload = {
  status: number;
  message: string;
};
