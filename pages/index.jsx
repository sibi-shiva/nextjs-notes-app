import { useState, useEffect } from 'react';
import produce from 'immer';

const Notes = (props) => props.data.map((note) => <div>{note.text}</div>);

export default () => {
	const initialData = [{ text: 'Loading Notes ... ' }];
	const [data, setData] = useState(initialData);

	const handleClick = () => {
		const text = document.querySelector('#noteinput').value.trim();
		if (text) {
			const nextState = produce(data, (draftState) => {
				draftState.push({ text });
			});
			document.querySelector('#noteinput').value = '';

			if (typeof window !== 'undefined') {
				localStorage.setItem('data', JSON.stringify(nextState));
			}

			setData(nextState);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const getData = localStorage.getItem('data');

			if (getData !== '' && getData !== null) {
				return setData(JSON.parse(getData));
			}
			return setData([]);
		}
	}, 0);

	return (
		<>
			<div
				className="ui raised very padded text container segment"
				style={{ margin: '50px' }}
			>
				<h2 className="ui header">Capture your notes here</h2>
				<div class="ui action input">
					<input
						id="noteinput"
						style={{ width: '80%' }}
						type="text"
						placeholder="Enter a new note"
					/>
					<button
						class="ui teal right labeled icon button"
						onClick={() => handleClick()}
					>
						Add note
					</button>
				</div>
				<div style={{ marginTop: '25px', fontWeight: '700' }}>
					<Notes data={data} />
				</div>
			</div>
		</>
	);
};
