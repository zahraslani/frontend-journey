type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2.5 bg-white/15 border border-white/30 rounded-full py-2 pr-2 pl-5 relative">
      <input className="flex-1 bg-transparent border-none outline-none text-white text-base text-left placeholder:text-white/60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter city name"
      />
    </div>
  );
}