interface formProps {
  label: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const FormInput = ({ label, setState }: formProps) => {
  return (
    <div className="w-72 h-16 border flex flex-col">
      <span className="text-sm pl-2">{label}</span>
      <input
        type="text"
        className="h-10 outline-0 pl-4"
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
