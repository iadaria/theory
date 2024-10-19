import { useState } from "react";

export function Ex0_11_Managed() {
    const [value, setValue] = useState('');

    function handleSubmit(e: React.BaseSyntheticEvent) {
        alert('Sending name is: ' + value);
        e.preventDefault();
    }

    function handleChange(e: React.BaseSyntheticEvent) {
        setValue(e.target.value)
    }

    return (
		<form onSubmit={handleSubmit}>
			<label>
				Имя:
				<input type="text" value={value} onChange={handleChange} />
			</label>
			<input type="submit" value="Отправить" />
		</form>
	);
}