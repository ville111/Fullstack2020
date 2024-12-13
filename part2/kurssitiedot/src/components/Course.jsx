
const Header = ({course}) =>  ( <h1>{course}</h1> )
const Part = ({part}) =>  ( <p>{part.name} {part.exercises}  </p>)
const Content = ({parts}) =>  ( parts.map(part => <Part key={part.id} part={part} /> ) )
  
const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum + part.exercises,0)
  return (
      <p>
        <b>total of {total} exercises</b>
      </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
   
}

export default Course
