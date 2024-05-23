interface DivProps {
  children: React.ReactNode;
}

export function Div(props: DivProps): React.JSX.Element {
  const { children } = props;
  return <div>{children}</div>;
}
