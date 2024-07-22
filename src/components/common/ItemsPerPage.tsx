import { Form } from 'react-bootstrap';

const OPTIONS = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

interface IItemsPerPageProps {
  itemsPerPage: number;
  setItemsPerPage: (event: number) => void;
  setCurrentPage: (number: number) => void;
}

const ItemsPerPage = ({ itemsPerPage, setItemsPerPage, setCurrentPage }: IItemsPerPageProps) => {
  const onChangeHandler = (event: { target: { value: string } }) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className=".sort-btn justify-content-end align-items-center pagination sort-btn">
      <p>Items Per Page</p>
      <Form.Group>
        <Form.Control className="select" as="select" value={itemsPerPage} onChange={onChangeHandler}>
          {OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default ItemsPerPage;
