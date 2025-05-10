import { Message } from '../enums/message.enum';

/**
 * Type for styling objects, typically used with CSS-in-JS libraries.
 * Requires a `css` helper function to be defined elsewhere (e.g., from a library).
 * Ensure the type definition for your CSS-in-JS library is also available.
 */
type Styles = {
  [key: string]: ReturnType<typeof css>; // Assuming `css` is a function that returns a style object/identifier
};

/**
 * Union type representing the possible types of notifications or messages.
 */
type NotificationType =
  | Message.SUCCESS
  | Message.INFO
  | Message.WARNING
  | Message.ERROR;

/**
 * Structure for a message or notification object.
 */
type MessageType = {
  type: NotificationType;
  message: string;
  description?: string;
};

export { Styles, NotificationType, MessageType };
