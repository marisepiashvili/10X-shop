import chevronDownIcon from "../../assets/icons/chevron-down.svg"

export type Option = {
    value: string
    label: string
}

type SelectFieldProps = {
    id: string
    label: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    color?: string
}


export default function SelectField({id, label, options, value, onChange, color = "bg-white"}:SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-extrabold pl-3.5">{label}</label>
      <div className="relative">
          <select id={id} className={`appearance-none w-full h-13.5 rounded-full border-2 border-ink ${color} pl-5.5 pr-12 text-base font-bold cursor-pointer`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option)=>
            (<option key={option.value} value={option.value}>{option.label}</option>
             ))}
          </select>
          <img src={chevronDownIcon} alt="" className="absolute right-4.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  )
}
