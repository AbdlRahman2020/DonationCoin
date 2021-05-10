const Category = ({ setCurrentCat }) => {

  return (
    <div className="categories" >
      <button className="category" onClick={() => setCurrentCat('Wildlife')} >Wildlife</button>
      <button className="category" onClick={() => setCurrentCat('Construction')}>Construction</button>
      <button className="category" onClick={() => setCurrentCat('Education')}>Education</button>
      <button className="category" onClick={() => setCurrentCat('Environment')}>Environment</button>
      <button className="category" onClick={() => setCurrentCat('Emergency')}>Emergency</button>
      <button className="category" onClick={() => setCurrentCat('Medical')}>Medical</button>
      <button className="category" onClick={() => setCurrentCat('')}>Reset filters</button>
    </div>
  )
}

export default Category
