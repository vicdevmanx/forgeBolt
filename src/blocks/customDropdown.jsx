// components/ui/CustomDropdown.jsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function CustomDropdown({ trigger, items = [] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[var(--bg-color)] text-[var(--text-primary)] border border-[var(--bg-tertiary)] shadow-md p-2 rounded-md font-[poppins]"
      >
        {items.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={item.onClick}
            className={`cursor-pointer text-sm hover:bg-[var(--bg-tertiary)] select-none ${
              item.danger ? "text-red-500" : ""
            } ${idx != 0 ? 'border-t border-[var(--bg-tertiary)]' : ''}`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
