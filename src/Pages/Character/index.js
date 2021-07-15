import React, { useState, useEffect } from 'react';
import ProductList from '../../Pages/Main/ProductList';
import { API } from '../../config';
import { characterData } from '../../Data/characterData';
import { fetchGet } from '../../utils/fetches';
import { useHistory, useParams } from 'react-router-dom';
import FilterModal from './FilterModal';
import './index.scss';
import SimpleNav from '../../Components/SimpleNav';

function Character(props) {
  const history = useHistory();
  const params = useParams();

  const [productLists, setProductLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState([
    { name: '신상품순', sort: 'new', isCheck: true },
    { name: '판매량순', sort: 'bestSell', isCheck: false },
    { name: '낮은가격순', sort: 'lowPrice', isCheck: false },
    { name: '높은가격순', sort: 'highPrice', isCheck: false },
  ]);
  const [filteringName, setFilteringName] = useState('신상품순');
  const [selectValue, setSelectValue] = useState(params.id);

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    history.push(`/character/${selectValue}`);
  }, [selectValue]);

  const getData = () => {
    fetchGet(`${API}/products?character=${params.id}`)
      .then((res) => res.json())
      .then((res) => setProductLists(res.resultList));
  };

  const toggleFilterModal = (e) => {
    const classList = [...e.target.classList];
    if (!isModalOpen) {
      setIsModalOpen(!isModalOpen);
    } else {
      if (classList.includes('dim')) {
        setIsModalOpen(!isModalOpen);
      }
    }
  };

  const toggleFilterCheck = (targetId) => {
    const prevChange = modalFilters.map((el) =>
      el.isCheck ? { ...el, isCheck: !el.isCheck } : el,
    );
    const nextFilters = prevChange.map((el, idx) =>
      targetId === idx ? { ...el, isCheck: !el.isCheck } : el,
    );
    setModalFilters(nextFilters);
    setFilteringName(modalFilters[targetId].name);
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      <SimpleNav />
      <section className="characterWrap">
        <div className="bannerWrap">
          <span className="bannerTitle">{params.id}</span>
          <img
            className="DropBtn"
            src="/images/bigdropdown.png"
            alt="dropbox"
          />
          <select onChange={handleChange} value={selectValue}>
            {characterData.map((chac) => (
              <option key={chac.id} value={chac.name}>
                {chac.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filterWrap">
          <div className="filter">
            <div className="filterName" onClick={toggleFilterModal}>
              <span>{filteringName}</span>
              <img src="/images/dropdown.png" alt="dropdown" />
            </div>
          </div>
          <div className="filteredInfo">
            <div className="filterTxt">
              <span>총</span>
              <span>{productLists.length}</span>
              <span>개</span>
            </div>
            <div className="filterCheckBox">
              <img src="/images/checkIcon.png" alt="체크" />
              <span className="filterGlobaltxt">글로벌 배송 가능상품 보기</span>
            </div>
          </div>
        </div>
        <div className="listWrap">
          <ProductList
            productLists={productLists}
            setProductLists={setProductLists}
          />
        </div>
      </section>
      {isModalOpen && (
        <FilterModal
          filters={modalFilters}
          toggleFilterModal={toggleFilterModal}
          toggleFilterCheck={toggleFilterCheck}
        />
      )}
    </>
  );
}

export default Character;
