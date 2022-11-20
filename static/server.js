const express = require("express");
const neo4j = require("neo4j-driver");
require('dotenv').config()
const driver = neo4j.driver(process.env.NEO4J_CONNECTION_URI, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));

async function init() {
  const app = express();

  app.get("/get", async (req, res) => {
    const session = driver.session();
    const result = await session.run(
      `
        MATCH (c:Career)-[:REQUIRES]->(skill)<-[:REQUIRES]-(otherCareer)
        WHERE c.name CONTAINS $career_name
        RETURN otherCareer.name AS name, COUNT(skill) AS skillsInCommon,
        COLLECT(skill.name) AS skills
        ORDER BY skillsInCommon DESC, otherCareer.name
        LIMIT 10
    `,
      {
        career_name: req.query.career_name,
        person2: req.query.person2, 
      }
    );

   
    names = result.records.map((record) => record.get("name"));
    skillsInCommon = result.records.map((record) => record.get("skillsInCommon"));
    skills = result.records.map((record) => record.get("skills"));
    res.send()
   // console.log(names, skillsInCommon);

    await session.close();
  });

  app.use(express.static("./static"));
  app.listen(process.env.PORT || 3000);
}
init();