import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  type?: string;
  accept?: string;
  options?: { value: string; label: string }[]; // Options for the select input
}

export const FormFieldWrapper = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type = "text",
  accept,
  options,
}: FormFieldWrapperProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === "select" ? (
            <Select
              value={field.value} // Bind the value to react-hook-form
              onValueChange={(value) => field.onChange(value)} // Ensure onChange updates the form value
            >
              <SelectTrigger>
                <div>{field.value || "Select an option"}</div>
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={type}
              placeholder={placeholder}
              accept={accept}
              {...field}
              value={type === "file" ? undefined : field.value}
              onChange={(e) => {
                if (type === "file") {
                  const file = e.target.files?.[0];
                  field.onChange(file); // Update the field value with the selected file
                } else {
                  field.onChange(e); // Use the default onChange for other input types
                }
              }}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
