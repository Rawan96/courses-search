import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Spin,
  Rate,
  Cascader,
  Input,
  Empty,
  Result,
  Pagination,
  Row,
  Col,
} from 'antd';
import propTypes from 'prop-types';
import axios from 'axios';
import { FiMenu } from 'react-icons/all';
import categories from '../../assets/courseCategories';
import { mainImg } from '../../assets/images';

import './style.css';

const HomePage = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [cat, setCat] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const searchRef = useRef(null);

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
        offset: (page - 1) * 10,
      });
      setLoading(false);
      setError('');
      setTotal(data.count);
      setCourses(data.rows);
    } catch (err) {
      const message = err.response
        ? err.response.data.message
        : 'sorry, something went wrong , try again later !';

      setLoading(false);
      setError(message);
    }
  };

  const handleClick = (id) => {
    history.push(`/course/${id}`);
  };
  const treeSelectOnChange = (value) => {
    const catId = value.pop();
    setCat(catId);
    setPage(1);
  };
  const inputOnSearch = (value) => {
    setSearchCourseName(value);
    setPage(1);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  const inputOnChange = (e) => {
    setSearchCourseName(e.target.value);
    setPage(1);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchCoursesByNameAndCatId(cat, searchCourseName);
  }, [page, cat, searchCourseName]);

  return (
    <div>
      {error ? (
        <Result status="error" title="Internal server Error." />
      ) : loading ? (
        <Spin />
      ) : (
        <>
          <Row>
            <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
              <Row>
                <Col span={20} offset={2}>
                  <p className="main-p">
                    Find the best courses, tutorials, and learning paths.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col offset={2} flex="38px">
                  <Cascader
                    value=""
                    size="large"
                    defaultValue={0}
                    options={categories}
                    onChange={treeSelectOnChange}
                    placeholder=""
                    suffixIcon={<FiMenu />}
                  />
                </Col>
                <Col flex="auto">
                  <Input.Search
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="input search text"
                    onSearch={inputOnSearch}
                    onChange={inputOnChange}
                    enterButton
                  />
                </Col>
                <Col span={2} />
              </Row>
            </Col>

            <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
              <img
                className="main-img"
                style={{ width: '100%' }}
                src={mainImg}
                alt="img"
              />
            </Col>
          </Row>
          <div className="container" ref={searchRef}>
            <div className="topRate__container">
              {courses.length > 0 ? (
                <Row gutter={(48, 48)}>
                  {courses.map((course) => (
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <div className="topRate__course-card" key={course.id}>
                        <h2>{course.title}</h2>
                        <div
                          style={{
                            width: 'min(25em, calc(100% - 8vw))',
                            height: '16em',
                          }}
                        >
                          <img
                            className="topRate__course-card__image"
                            alt="courseImg"
                            src={course.image}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>
                        {course.rate && (
                          <span>
                            <Rate
                              value={Math.round(course.rate * 2) / 2}
                              Rate
                              allowHalf
                            />
                          </span>
                        )}
                        <h3>{course.source}</h3>
                        <Button
                          onClick={() => handleClick(course.id)}
                          type="primary"
                        >
                          {' '}
                          More
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty />
              )}
              <Pagination
                className="pagination"
                onChange={(k) => setPage(k)}
                defaultCurrent={1}
                total={total}
                showSizeChanger={false}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
