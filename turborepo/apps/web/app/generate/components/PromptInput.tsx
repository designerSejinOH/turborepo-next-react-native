export interface PromptInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput = (props: PromptInputProps): React.JSX.Element => {
  const { label, value, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
