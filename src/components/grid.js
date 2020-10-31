import React, { Component } from "react";
import { List, Tab } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Checkbox, Dropdown, Pagination, Input, Icon, Table, Image, Label, Progress, Menu, } from "semantic-ui-react";
import setting from "../assets/settings.png";
import firstItem from "../assets/firstItem.png";
import lastItem from "../assets/lastItem.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import downSort from "../assets/downSort.png";
import upSort from "../assets/upSort.png";
import { Loader,  Segment } from "semantic-ui-react";
import configData from "./configData.json";
import axios from 'axios'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 11,
      currentPage: 1,
      activePage: 1
  }
  this.handleChange = this.handleChange.bind(this)
  }

  handleInputChange = (e, { value }) =>{ 
    this.setState({ activePage: value })
  
  }

  handlePaginationChange = (e, { activePage }) =>{
     this.setState({ activePage })
     axios
     .get('https://jsonplaceholder.typicode.com/comments')
     .then(res => {
         var tdata = res.data;
         console.log("tdata", tdata)
         console.log('data-->'+JSON.stringify(tdata))
  var slice = tdata.slice(this.state.activePage, this.state.activePage *  this.state.perPage)
  console.log("slice", slice)
         this.setState({
             pageCount: Math.ceil(tdata.length / this.state.perPage),
             orgtableData : tdata,
             tableData:slice
         })
     });
    }


  handleChange=(e)=>{
    const selectedPage = e.selected
    const offset = selectedPage * this.state.perPage
    this.setState({
      currentPage:selectedPage,
      offset: offset
    },()=>{
      this.loadMoreData()
    })
  }


  loadMoreData() {
		const data = this.state.orgtableData;
		const slice = data.slice(this.state.activePage, this.state.activePage + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.activePage),
			tableData:slice
		})}


  componentDidMount() {
    this.setState({ tableRow: configData.tableRow });   
      }

  render() {
    const defaultOptions = [
      {
        image: (
          <Label className="Derek" as="a" circular>
            D
          </Label>
        ),
        key: "Derek Roberts",
        text: "Derek Roberts",
        value: "Derek Roberts",
      },
      {
        image: (
          <Label className="Jonathan" as="a" circular>
            J
          </Label>
        ),
        key: "Jonathan Robertson",
        text: "Jonathan Robertson",
        value: "Jonathan Robertson",
      },
      {
        image: (
          <Label className="Nichole" as="a" circular>
            N
          </Label>
        ),
        key: "Nichole Smith",
        text: "Nichole Smith",
        value: "Nichole Smith",
      },
      {
        image: (
          <Label className="Susan Miller" as="a" circular>
            S
          </Label>
        ),
        key: "Susan Millert",
        text: "Susan Miller",
        value: "Susan Miller",
      },
      {
        image: (
          <Label as="a" circular>
            U
          </Label>
        ),
        key: "Unassigned",
        text: "Unassigned",
        value: "Unassigned",
      },
    ];

    const data = [
      {
        menuItem: "UNASSIGNED TASKS",
        pane: (
          <div>
            <div>
              <Grid columns={9}>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Checkbox
                      className="toggleBtn"
                      label="Multi Sort"
                      defaultChecked
                      toggle
                    />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Dropdown
                      placeholder="Clear All Filters"
                      icon="close"
                      className="filterDrop"
                      clearable
                      iconPosition="left"
                      fluid
                      multiple
                      selection
                    />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <div class="ui ">Results: 1 to 5 of 144</div>
                  </Grid.Column>
                  <Grid.Column
                    className="itemPerPage"
                    width={1}
                    textAlign="right"
                  >
                    <div class="ui  ">Items per page</div>
                  </Grid.Column>
                  <Grid.Column width={1} textAlign="left">
                    <Input className="itemPage" value="10" type="number" />
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="left">
                    <div>
                      <Pagination
                        className="tablePaginator"
                        defaultActivePage={1}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true,
                        }}
                        firstItem={{
                          content: <Image src={lastItem}></Image>,
                          image: true,
                        }}
                        lastItem={{
                          content: <Image src={firstItem}></Image>,
                          image: true,
                        }}
                        prevItem={{
                          content: <Image src={leftArrow}></Image>,
                          image: true,
                        }}
                        nextItem={{
                          content: <Image src={rightArrow}></Image>,
                          image: true,
                        }}
                        totalPages={5}
                        activePage={this.state.activePage}
                        onPageChange={this.handlePaginationChange}
                           
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column
                    width={1}
                    className="itemPerPage"
                    textAlign="right"
                  >
                    <div class="ui ">Go to page</div>
                  </Grid.Column>
                  <Grid.Column width={1} className="nopad">
                    <Input className="itemPage" value="6" type="number" />
                  </Grid.Column>
                  <Grid.Column width={1} className="nopad" textAlign="left">
                    <div class="ui ">of 10</div>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    <div class="ui go">
                      <span>Go </span>{" "}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div className="table">
              <Table className="table-container" celled compact definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell width="1">
                      <Image src={setting} />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="checkColumn">
                      <Checkbox />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon" as="a">
                        Task Name
                        <Image className="sortIcon" src={downSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon" as="a">
                        LOB
                        <Image className="sortIcon" src={downSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon" as="a">
                        SUBTASKS
                        <Image className="sortIcon" src={downSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon" as="a">
                        ASSIGNED TO
                        <Image className="sortIcon" src={downSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon" as="a">
                        Step
                        <Image className="sortIcon" src={downSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="taskName">
                      <Label className="rightIcon dueDate" as="a">
                        Due Date
                        <Image className="sortIcon" src={upSort}></Image>
                      </Label>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {this.state.tableRow ? (
                <Table.Body>
                  {this.state.tableData.map((row, index) => {
                    return (
                      <Table.Row className="borderTab">
                        <Table.Cell width="1"></Table.Cell>
                        <Table.Cell className="checkColumn" collapsing>
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="taskName">
                          <div class="ui taskName">
                    <span class="dottedUnderline">{row.email}</span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Label className="purple labelTag"> {"MEDICARE"}</Label>
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                          <Dropdown
                            inline
                            className="assignDrops"
                            options={defaultOptions}
                            defaultValue={defaultOptions[4].value}
                          />
                        </Table.Cell>
                        <Table.Cell>{"In Review"}</Table.Cell>
                        <Table.Cell>
                          <Progress
                            className={"timeProgress orangeProgress" }
                            progress="value"
                            value="09/04/2020 @ 9:00 AM"
                          />
                          <Label
                            className="rightIcon expandIcon dueDate"
                            as="a"
                          >
                            <Image
                              className="sortIcon"
                              src={rightArrow}
                            ></Image>
                          </Label>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
               ) : (
                <Segment>
                  <Loader active />
                </Segment>
              )}
              </Table>
            </div>
          </div>
        ),
      },
      { menuItem: "ASSIGNED TASKS", pane: "Rutika" },
      { menuItem: "ALL TASKS", pane: "Vinoda Dasar" },
      {
        menuItem: (
          <Menu.Item key="messages" className="to-right">
            Assign Task(s)
          </Menu.Item>
        )
      },
    ];
    console.log("activePage",this.state.activePage)

    return (
      <div>
        <div>
        <Tab className="tab-header" panes={data} renderActiveOnly={false} />
      </div>
      </div>
    );
  }
}

export default Home;
