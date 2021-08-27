import React, { Component } from 'react'

class Money extends Component {

    render() {

        return (
            <section className="container money">
                <div className="row moneyRow">
                    <h4>We Value Your Money</h4>
                    <p>Receive your item as described. Or your money back.</p>
                    <button className="btn terms" type="button">
                        <a href="/terms" className="text-white">Terms & conditions</a>
                    </button>
                </div>
            </section>
        )
    }
}

export default Money