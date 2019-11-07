import React from 'react';

import api from '../api';

import { IDLE, LOADING, ERROR } from '../constants/states';

export default class Main extends React.Component {
  state = {
    listState: IDLE,
    list: []
  };

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    this.setState({ listState: LOADING });
    try {
      const list = await api.getList();

      this.setState({ list, listState: IDLE });
      console.log('list', list);
    } catch (e) {
      this.setState({ listState: ERROR });
    }
  };

  saveList = async () => {
    this.setState({ listState: LOADING });
    try {
      await api.saveList(this.state.list);

      this.setState({ listState: IDLE });
    } catch (e) {
      this.setState({ listState: ERROR });
    }
  };

  dencrement = id => {
    const list = [...this.state.list],
      idx = list.findIndex(item => item.id === id),
      item = list[idx];

    item.count = (item.count || 0) - 1;

    list[idx] = item;

    this.setState({ list });
  };

  increment = id => {
    const list = [...this.state.list],
      idx = list.findIndex(item => item.id === id),
      item = list[idx];

    item.count = (item.count || 0) + 1;

    list[idx] = item;

    this.setState({ list });
  };

  render() {
    const { list } = this.state;

    return (
      <>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {list.map(item => (
                  <tr key={item.id} data-id={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          onClick={() => {
                            this.dencrement(item.id);
                          }}
                          type="button"
                          className="btn btn-sm btn-danger"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          disabled
                          className="btn btn-sm btn-secondary"
                        >
                          {item.count || 0}
                        </button>
                        <button
                          onClick={() => {
                            this.increment(item.id);
                          }}
                          type="button"
                          className="btn btn-sm btn-success"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col text-right">
            <button onClick={this.saveList} className="btn btn-success">
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}
