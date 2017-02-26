import uuid from 'uuid';
import bodyParser from 'body-parser';
import config from '../config.server';
import express from 'express';
import cors from 'cors';
import faker from 'faker';
import { generatePerson } from './utils/random';
import request from 'request';
import cheerio from 'cheerio';
import mysql from 'mysql';
import async from 'async';

const app = express();
app.use(cors());
app.set('json spaces', 2);
app.use(bodyParser.json());

const generator = generatePerson();

let persons = Array.from('lorem ipsum dolor sit amet sic transit gloria mundi los tussiposcos').map(generator);

app.get('/person', (req, res) => {
  res.send(persons);
});

app.get('/api/courses', (req, res) => {
  getCourses(getConnection(), (error, results) => {
    res.send(results.map(row => {
      return {
        id: row.id,
        name: row.name,
        url: row.url,
        mapUrl: row.map_url,
        foundationYear: row.foundation_year,
        rating: row.rating,
        holeCount: row.hole_count,
        city: row.city,
        createdAt: row.created_at,
        updatedAt: row.udated_at
      }
    }));
  });
});

app.get('/api/courses/import', (req, res) => {

  const fgrCoursesUrl = 'http://frisbeegolfradat.fi/radat/';

  if (1==1) {
    res.send({ok: true, message: 'Data already imported'});
    return;
  }
  request(fgrCoursesUrl, (error, response, body) => {

    let courseNames = [];
    let conn = getConnection();
    let $ = cheerio.load(body);
    let connection = getConnection();

    const fgrCoursesUrl = 'http://frisbeegolfradat.fi/radat/';

    let importedData = [];

    $('#radatlistaus tbody tr').each((i, element) => {
      const $rating = $(element).find('td').next();
      const $course = $(element).find('td').next().next();
      const url = $course.find('a').attr('href');
      const ratingUrl = String($rating.find('img').attr('src'));
      const $location = $(element).find('td.paikkaCol');
      const mapUrl = $(element).find('td:last-child').find('a').attr('href');

      let courseData = {
        name: $course.find('a').text(),
        url: url,
        rating: ratingUrl.substring(
          ratingUrl.lastIndexOf('/') + 1,
          ratingUrl.lastIndexOf('.')
        ),
        city: $location.html(),
        holeCount: $location.next().html(),
        foundationYear: null,
        mapUrl: mapUrl,
      };

      request(url, (err, resp, b) => {
        let $page = cheerio.load(b);

        let $li = $page('ul.course_info span.group:first-child').next().find('li:first-child');

        let content = $li.html();

        let $b = $li.find('b');

        let creationYear = null;
        if ($b && $b.text() === 'Perustettu') {

          if ($li.find('p').text().length) {
            console.log("year: " + $li.find('p').text());
            creationYear = parseInt($li.find('p').text());
          }
        }

        courseData.foundationYear = creationYear;
        courseData.content = content;

        addCourse(courseData, connection, (error, result) => {
          if (error) {
            console.log("Error: " + error);
          }

        });
      });

    });
  });
  res.send({ok: true});
});

function addCourse(course, connection, callback) {
  connection.query(
    `INSERT INTO
        course (name, url, map_url, foundation_year, rating, hole_count, city)
    VALUES
        (:name, :url, :mapUrl, :foundationYear, :rating, :holeCount, :city)`,
    {
        name: course.name,
        url: course.url,
        mapUrl: course.mapUrl,
        foundationYear: course.foundationYear,
        rating: course.rating,
        holeCount: course.holeCount,
        city: course.city,
        streetAddress: course.streetAddress,
        zipcode: course.zipcode,
        country: course.country,
    },
    callback
  );
}

function getCourses(connection, callback) {
  connection.query('SELECT * FROM course', callback);
}

function getConnection() {
  let connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database
  });

  connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {

      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }

      return txt;
    }.bind(this));
  };

  connection.connect();

  return connection;
}

const port = config.port + 2;
app.listen(port);
console.log(`Listening at port ${port}`);
