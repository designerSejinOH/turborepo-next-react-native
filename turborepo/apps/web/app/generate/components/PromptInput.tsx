export interface PromptInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export const PromptInput = (props: PromptInputProps): React.JSX.Element => {
  const { label, value, onChange } = props
  return (
    <div className='text-white flex flex-row gap-4'>
      <label className='text-white'>{label}</label>
      <input type='text' value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
