const result = {
	list: []
};

//XML-парсер
const parser = new DOMParser();

//XML
const xmlInfo = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

//Парсинг XML
const xmlDOM = parser.parseFromString(xmlInfo, 'text/xml');
const studentsNodes = xmlDOM.querySelectorAll('student');

studentsNodes.forEach((elem) => {
	const student = new Object();
	const studentFirstName = elem.querySelector('first');
	const studentSecondName = elem.querySelector('second');
	const studentAge = elem.querySelector('age');
	const studentProf = elem.querySelector('prof');
	const nameNode = elem.querySelector('name');
	const nameLang = nameNode.getAttribute('lang');
	student.name = studentFirstName.textContent + ' ' + studentSecondName.textContent;
	student.age = studentAge.textContent;
	student.prof = studentProf.textContent;
	student.lang = nameLang;
	result.list.push(student);
});

console.log(result);