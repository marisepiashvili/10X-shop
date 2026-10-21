import chevronDownIcon from "../../assets/icons/chevron-down.svg"

export type Option = {
    value: string
    label: string
}

type SelectFieldProps = {
    id: string
    label: string
    options: Option[]
}


export default function SelectField({id, label, options}:SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-[#12424A]">{label}</label>
      <div className="relative">
          <select id={id} className="appearance-none w-full h-14 rounded-full border-2 border-[#12424A]  bg-white pl-6 pr-12 text-lg text-[#12424A] cursor-pointer">
            {options.map((option)=>
            (<option key={option.value} value={option.value}>{option.label}</option>
             ))}
          </select>
          <img src={chevronDownIcon} alt="chevron down icon" className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  )
}
