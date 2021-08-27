import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Button, Table } from 'reactstrap';
import trash from '../../../images/trash.svg';
import EditIcon from '../../../images/edit.svg';
import EditItem from './EditItem'

const CategoryItems = ({ allOfCategory, deleteCatItem, caTitle }) => {

    var today = new Date();
    var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    return (
        <Row className="all-items">
            <Table size="sm" className="all-scores" hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Company</th>

                        {caTitle === 'Scholarships' || caTitle === 'Jobs' ?
                            <th>Deadline</th> : null}

                        <th>Creator</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {allOfCategory.map((item, index) =>

                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title && item.title}</td>
                            <td>{item.brand && item.brand}</td>

                            {caTitle === 'Scholarships' || caTitle === 'Jobs' ?
                                <td>
                                    {new Date(item.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) === '01/01/2025' ?
                                        'Ongoing' :

                                        (new Date(item.deadline) < yesterday) ? 'Closed' :

                                            new Date(item.deadline).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </td> : null}

                            <td>{item.creator && item.creator.name}</td>

                            <td>
                                <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteCatItem(item._id)}>
                                    <img src={trash} alt="" width="16" height="16" />
                                </Button>

                                {caTitle === 'Jobs' ?
                                    <Link to={`/dashboard/edit-job/${item._id}`} className="text-secondary">
                                        <img src={EditIcon} alt="" width="16" height="16" />
                                    </Link> :

                                    caTitle === 'Scholarships' ?
                                        <Link to={`/dashboard/edit-scholarship/${item._id}`} className="text-secondary">
                                            <img src={EditIcon} alt="" width="16" height="16" />
                                        </Link> :

                                        <EditItem itemToEdit={item} />
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Row>
    )
}

export default CategoryItems