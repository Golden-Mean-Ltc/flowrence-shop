import '../styles/ScrollableList.css';

const ScrollableList = ({ items }) => {
  return (
    <div className="scroll-container">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollableList;