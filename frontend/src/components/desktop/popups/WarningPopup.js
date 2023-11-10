import React from "react";
import Modal from "react-responsive-modal";
import isEmpty from "../../../store/validations/is-empty";
import getSymbolFromCurrency from "currency-symbol-map";
import GreenButtonSmallFont from "../common/GreenButtonSmallFont";
import GrayButtonSmallFont from "../common/GrayButtonSmallFont";

const WarningPopup = ({
  downgradeWarningPopup,
  currentProductData,
  productSelected,
  onCloseHandler,
  continueHandler,
}) => {
  // console.log(currentProductData);

  let OrganizationData = JSON.parse(localStorage.getItem("OrganizationData"));

  if (!isEmpty(currentProductData) && !isEmpty(productSelected)) {
    return (
      <div>
        <Modal
          open={downgradeWarningPopup}
          onClose={onCloseHandler}
          closeOnEsc={true}
          closeOnOverlayClick={false}
          center
          classNames={{
            overlay: "customOverlay",
            modal:
              "warning-employee-model customModal-warning customModal--addLead",
            closeButton: "customCloseButton",
          }}
        >
          {/* <span className="closeIconInModal" onClick={this.WarningModalClose} /> */}
          <div className="employee-warning-popup-container">
            <h3>Downgrade your plan</h3>
          </div>
          <div className="warning-downgarade-section">
            <div className="current-plan-section">
              <h3>Your Current Plan</h3>
              <div className="detail-section">
                <div className="detail-section-img-div">
                  <img
                    src={
                      currentProductData.name === "ROVER"
                        ? require("./../../../assets/img/plans/plans-rover.svg")
                        : currentProductData.name === "ASTRONAUT"
                        ? require("./../../../assets/img/plans/plans-astronaut.svg")
                        : currentProductData.name === "SPACESHIP"
                        ? require("./../../../assets/img/plans/plans-spaceship.svg")
                        : currentProductData.name === "SPACESTATION"
                        ? require("./../../../assets/img/plans/plans-space-colony.svg")
                        : require("./../../../assets/img/plans/free.svg")
                    }
                    alt={""}
                  />
                </div>
                <div>
                  <h4>{currentProductData.name}</h4>
                  <p>
                    {" "}
                    {currentProductData.name === "ASTRONAUT"
                      ? `${!isEmpty(currentProductData) &&
                          currentProductData.metadata.maxUsers} User`
                      : currentProductData.name === "ROVER"
                      ? `2-${!isEmpty(currentProductData) &&
                          currentProductData.metadata.maxUsers} Users`
                      : currentProductData.name === "SPACESHIP"
                      ? `6-${!isEmpty(currentProductData) &&
                          currentProductData.metadata.maxUsers} Users`
                      : currentProductData.name === "SPACESTATION"
                      ? `11-${!isEmpty(currentProductData) &&
                          currentProductData.metadata.maxUsers} Users`
                      : ""}
                  </p>
                  <h5>
                    {" "}
                    {!isEmpty(currentProductData) && (
                      <>{currentProductData.metadata.monthlyPrice}/Mo</>
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <div className="downgrading-plan-section">
              <h3 className="downgrading-plan-section-title">
                You are downgrading to the plan:
              </h3>
              <div className="detail-section">
                <div className="detail-section-img-div">
                  <img
                    src={
                      productSelected.name === "ROVER"
                        ? require("./../../../assets/img/plans/plans-rover.svg")
                        : productSelected.name === "ASTRONAUT"
                        ? require("./../../../assets/img/plans/plans-astronaut.svg")
                        : productSelected.name === "SPACESHIP"
                        ? require("./../../../assets/img/plans/plans-spaceship.svg")
                        : productSelected.name === "SPACESTATION"
                        ? require("./../../../assets/img/plans/plans-space-colony.svg")
                        : ""
                    }
                    alt="plans"
                  />
                </div>
                <div>
                  <h4>{productSelected.name}</h4>
                  <p>
                    {" "}
                    {productSelected.name === "ASTRONAUT"
                      ? `${!isEmpty(productSelected) &&
                          productSelected.metadata.maxUsers} User`
                      : productSelected.name === "ROVER"
                      ? `2-${!isEmpty(productSelected) &&
                          productSelected.metadata.maxUsers} Users`
                      : productSelected.name === "SPACESHIP"
                      ? `6-${!isEmpty(productSelected) &&
                          productSelected.metadata.maxUsers} Users`
                      : productSelected.name === "SPACESTATION"
                      ? `11-${!isEmpty(productSelected) &&
                          productSelected.metadata.maxUsers} Users`
                      : ""}
                  </p>
                  <h5>
                    {!isEmpty(productSelected) && (
                      <>
                        {OrganizationData.currency === "inr"
                          ? "Rs."
                          : getSymbolFromCurrency(
                              OrganizationData.currency.toUpperCase()
                            )}
                        {productSelected.priceData.unit_amount / 100}/Mo
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <div className="btn-section">
              {/*<button onClick={onCloseHandler} className="cancel-btn">
                Cancel
              </button>
              <button onClick={continueHandler} className="continue-btn">
                Continue
                          </button>*/}
              <GrayButtonSmallFont
                onClick={onCloseHandler}
                text="Cancel"
                extraClassName="payment-cancel-btn"
              />
              <GreenButtonSmallFont
                onClick={continueHandler}
                text={"Continue"}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
};

export default WarningPopup;
