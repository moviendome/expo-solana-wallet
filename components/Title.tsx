import * as React from "react";
import { Title as T } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof T>;

const Title = ({ children, ...props }: Props) => (
  <T style={{ color: theme.colors.accent, marginBottom: 20 }}>{children}</T>
);

export default Title;
