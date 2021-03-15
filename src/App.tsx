import React from 'react';

interface IListItemProps {
  children: number;
  id: string;
}

const ListItem = ({ children, id }: IListItemProps) => (
  <li>{children} <span id={id}>Delete</span></li>
);

interface IListProps {
  list: Array<number>;
  onDelete: (e:any)=>void;
}
const List = ({ list, onDelete }: IListProps) => (
  <ul onClick={onDelete}>
    {list.length && list.map((item, index) => (
      <ListItem key={index} id={String(index)} >{item}</ListItem>
    ))}
  </ul>
);

interface IListWithModifyProps<T extends Array<any> = Array<number>> {
  list: T;
  setList:  React.Dispatch<React.SetStateAction<number[]>>
}

const ListWithModify: React.FC<IListWithModifyProps> = ({ list, setList }) => { 
  const handleShift =  React.useCallback((e): void => {
    e.preventDefault();
    setList(prevList => prevList.slice(1));
  }, [setList]);
  
  const handlePush = React.useCallback((e): void => {
    e.preventDefault();
    setList(prevList => [...prevList, prevList.length]);
  },[setList])
  
  // костыль на скорую руку
  const handleDelete = (event: React.MouseEvent<any, MouseEvent> & {target: {id: string}}) => {
    event.preventDefault();
    if(event.target.id){
      const deletedIndex = event.target.id;
      setList(list.filter((_, index)=> String(index) !== deletedIndex));
    }
    
  };

  if (!list.length) return null;
  
  return (
    <div>
      <div>
        <input type="button" value="shift" onClick={handleShift} />
        <input type="button" value="push" onClick={handlePush} />
      </div>
      
      <List list={list} onDelete={handleDelete} />
    </div>
  )
};

export const App: React.FC = () => {
  const [list, setList] = React.useState<Array<number>>([0, 1, 2, 3, 4, 5]);

  return (
    <div>
      <ListWithModify list={list} setList={setList} />
    </div>
  )
}


