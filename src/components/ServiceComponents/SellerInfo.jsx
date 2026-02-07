import "./SellerInfo.css";

const SellerInfo = ({ seller }) => {
  return (
    <div className="seller-info">
      <div className="seller-avatar">
        <img src={seller.logo} alt={`${seller.name}'s logo`} />
      </div>
      <div className="seller-details">
        <h3>{seller.name}</h3>
      </div>
    </div>
  );
};

export default SellerInfo;