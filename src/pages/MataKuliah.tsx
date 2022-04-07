import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';
import DataTable from 'react-data-table-component';
import intance from '@app/utils/axios';

const columns = [
  {
    name: 'code',
    // selector: (row) => row.code,
    sortable: true
  },
  {
    name: 'name'
    // selector: (row) => row.name
  }
];

const data = [
  {
    id: 1,
    code: 'FI1234',
    name: 'Fisika Dasar 1B'
  },
  {
    id: 2,
    code: 'MA1202',
    name: 'Kalkulus 2'
  }
];

const token = localStorage.getItem('token');
const header = {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjRkMDA1N2RmM2VlYjE3OGNlODk4MjgiLCJpYXQiOjE2NDkzMjA4NTUsImV4cCI6MTY0OTMyMjY1NSwidHlwZSI6ImFjY2VzcyJ9.X-D4WBmNfDG1YUGvV4XwgTb1XC4ZSp9DiLCUILJWA7E'}};
// eslint-disable-next-line no-console
console.log(header);
console.log(token);

const MataKuliah = () => {
  const [remoteData , setRemoteData] = useState([]);

  useEffect(() =>{
    intance.get('http://localhost:3001/v1/mataKuliahs/', header).then((res) => {
      console.log(res);
      setRemoteData(res.results);
    });
  });

  return (
    <div>
      <ContentHeader title="Mata Kuliah Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Data Master Mata Kuliah</h3>
              <div>{token}</div>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <DataTable columns={columns} data={remoteData} />
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default MataKuliah;
