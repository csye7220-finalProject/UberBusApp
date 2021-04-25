const stylePaper = {
  height: "200px",
  width: "700px",
  float: "left",
  background: "#f8f8f9",
  marginRight: "30px",
  marginLeft: "150px",
  marginTop: "90px",
};
const BusDetails = ({ buses }) => {
  return (
    <table style={stylePaper}>
      <thead>
        <tr>
          <th>Booking Id</th>
          <th>Bus Operator</th>
          <th>Pick Up Location</th>
          <th>Drop Location</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Time</th>
          <th>Seats</th>
        </tr>
      </thead>
      <tbody>
        {buses.length > 0
          ? buses.map((bus, index) => {
              return (
                <tr key={index}>
                  <td>{bus._id}</td>
                  <td>{bus.name}</td>
                  <td>{bus.source}</td>
                  <td>{bus.destination}</td>
                  <td>{bus.date}</td>
                  <td>{bus.duration}</td>
                  <td>{bus.time}</td>
                  <td>{bus.quantity}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default BusDetails;
