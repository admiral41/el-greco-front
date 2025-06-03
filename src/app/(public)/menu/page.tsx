"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Menu.module.css";
import {
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: 1,
    title: "Bruschetta",
    category: "Starters",
    description: "Grilled bread with fresh tomato & basil",
    price: 6,
  },
  {
    id: 2,
    title: "Greek Salad",
    category: "Starters",
    description: "Feta, olives, tomatoes & cucumbers",
    price: 8,
  },
  {
    id: 3,
    title: "Moussaka",
    category: "Mains",
    description: "Layered eggplant, meat, and béchamel",
    price: 14,
  },
  {
    id: 4,
    title: "Grilled Lamb",
    category: "Mains",
    description: "Served with rosemary potatoes",
    price: 18,
  },
  {
    id: 5,
    title: "Baklava",
    category: "Desserts",
    description: "Flaky pastry with nuts and honey",
    price: 7,
  },
  {
    id: 6,
    title: "Galaktoboureko",
    category: "Desserts",
    description: "Semolina custard in filo with syrup",
    price: 7,
  },
  {
    id: 7,
    title: "Dolmades",
    category: "Starters",
    description: "Vine leaves stuffed with rice",
    price: 7,
  },
  {
    id: 8,
    title: "Seafood Pasta",
    category: "Mains",
    description: "Linguine with prawns, mussels & garlic",
    price: 20,
  },
];

const categories = ["All", "Starters", "Mains", "Desserts"];
const tipOptions = [10, 15, 18, 20];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [orderType, setOrderType] = useState<"takeaway" | "dine-in">("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [tipAmount, setTipAmount] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate cart totals
  const cartItems = Object.keys(cart)
    .map((id) => {
      const itemId = parseInt(id);
      const item = menuItems.find((i) => i.id === itemId);
      return item ? { ...item, quantity: cart[itemId] } : null;
    })
    .filter(Boolean) as Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const tipValue = tipAmount || parseFloat(customTip) || 0;
  const total = subtotal + tax + tipValue;

  // Add to cart function
  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Adjust quantity in cart
  const adjustQuantity = (id: number, change: number) => {
    setCart((prev) => {
      const newQuantity = (prev[id] || 0) + change;
      if (newQuantity <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQuantity };
    });
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  // Refresh GSAP scroll triggers when cart state changes
  useEffect(() => {
    if (sectionRef.current) {
      ScrollTrigger.refresh();
    }
  }, [isCartOpen, isCheckoutOpen]);

  return (
    <section ref={sectionRef} className={styles.menu}>
      {/* Cart Floating Button (Mobile) */}
      {!isCheckoutOpen && (
        <button
          className={styles.cartButton}
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className={styles.cartBadge}>{cartItems.length}</span>
          )}
        </button>
      )}

      {/* Desktop Cart Sidebar */}
      {!isMobile && isCartOpen && (
        <div className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ""}`}>
          <div className={styles.cartHeader}>
            <h3>Your Order</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsCartOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
              <button
                className={styles.continueButton}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className={styles.cartContent}>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h4>{item.title}</h4>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className={styles.quantityControl}>
                      <button onClick={() => adjustQuantity(item.id, -1)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => adjustQuantity(item.id, 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tip:</span>
                  <span>${tipValue.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Cart Bottom Sheet */}
      <div
        className={`${styles.mobileCartSheet} ${
          isCartOpen && isMobile ? styles.open : ""
        }`}
      >
        <div className={styles.sheetHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsCartOpen(false)}
          >
            <FaArrowLeft />
          </button>
          <h3>Your Order</h3>
        </div>
        <div className={styles.sheetContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
              <button
                className={styles.continueButton}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h4>{item.title}</h4>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className={styles.quantityControl}>
                      <button onClick={() => adjustQuantity(item.id, -1)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => adjustQuantity(item.id, 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tip:</span>
                  <span>${tipValue.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal (Desktop) */}
      {!isMobile && isCheckoutOpen && (
        <div className={styles.checkoutModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Complete Your Order</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsCheckoutOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.checkoutForm}>
              <div className={styles.formGroup}>
                <label>Order Type</label>
                <div className={styles.orderType}>
                  <button
                    className={`${styles.typeButton} ${
                      orderType === "dine-in" ? styles.active : ""
                    }`}
                    onClick={() => setOrderType("dine-in")}
                  >
                    Dine In
                  </button>
                  <button
                    className={`${styles.typeButton} ${
                      orderType === "takeaway" ? styles.active : ""
                    }`}
                    onClick={() => setOrderType("takeaway")}
                  >
                    Takeaway
                  </button>
                </div>
              </div>
              {orderType === "dine-in" && (
                <div className={styles.formGroup}>
                  <label>Table Number</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                    className={styles.tableInput}
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Add Tip</label>
                <div className={styles.tipOptions}>
                  {tipOptions.map((percent) => (
                    <button
                      key={percent}
                      className={`${styles.tipButton} ${
                        tipAmount === percent ? styles.active : ""
                      }`}
                      onClick={() => {
                        setTipAmount(percent);
                        setCustomTip("");
                      }}
                    >
                      {percent}%
                    </button>
                  ))}
                  <button
                    className={`${styles.tipButton} ${
                      tipAmount === null ? styles.active : ""
                    }`}
                    onClick={() => setTipAmount(null)}
                  >
                    Custom
                  </button>
                </div>
                {tipAmount === null && (
                  <div className={styles.customTip}>
                    <span>$</span>
                    <input
                      type="number"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}
              </div>
              <div className={styles.finalSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tip:</span>
                  <span>${tipValue.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={styles.placeOrderButton}
                onClick={() => alert("Order placed successfully!")}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Checkout Bottom Sheet */}
      {isMobile && isCheckoutOpen && (
        <div
          className={`${styles.mobileCheckoutSheet} ${
            isCheckoutOpen ? styles.open : ""
          }`}
        >
          <div className={styles.sheetHeader}>
            <button
              className={styles.backButton}
              onClick={() => setIsCheckoutOpen(false)}
            >
              <FaArrowLeft />
            </button>
            <h3>Complete Your Order</h3>
          </div>
          <div className={styles.sheetContent}>
            <div className={styles.checkoutForm}>
              <div className={styles.formGroup}>
                <label>Order Type</label>
                <div className={styles.orderType}>
                  <button
                    className={`${styles.typeButton} ${
                      orderType === "dine-in" ? styles.active : ""
                    }`}
                    onClick={() => setOrderType("dine-in")}
                  >
                    Dine In
                  </button>
                  <button
                    className={`${styles.typeButton} ${
                      orderType === "takeaway" ? styles.active : ""
                    }`}
                    onClick={() => setOrderType("takeaway")}
                  >
                    Takeaway
                  </button>
                </div>
              </div>
              {orderType === "dine-in" && (
                <div className={styles.formGroup}>
                  <label>Table Number</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                    className={styles.tableInput}
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Add Tip</label>
                <div className={styles.tipGrid}>
                  {tipOptions.map((percent) => (
                    <button
                      key={percent}
                      className={`${styles.tipButton} ${
                        tipAmount === percent ? styles.active : ""
                      }`}
                      onClick={() => {
                        setTipAmount(percent);
                        setCustomTip("");
                      }}
                    >
                      {percent}%
                    </button>
                  ))}
                  <button
                    className={`${styles.tipButton} ${
                      tipAmount === null ? styles.active : ""
                    }`}
                    onClick={() => setTipAmount(null)}
                  >
                    Custom
                  </button>
                </div>
                {tipAmount === null && (
                  <div className={styles.customTip}>
                    <span>$</span>
                    <input
                      type="number"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}
              </div>
              <div className={styles.finalSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tip:</span>
                  <span>${tipValue.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={styles.placeOrderButton}
                onClick={() => alert("Order placed successfully!")}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay with glass/blur effect */}
      {(isCartOpen || isCheckoutOpen) && (
        <div
          className={styles.overlay}
          onClick={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(false);
          }}
        />
      )}

      {/* Rest of your UI (unchanged) */}
      <div className={`${styles.container} ${(isCartOpen || isCheckoutOpen) ? styles.blurred : ''}`}>
        {/* Header, Tabs, Menu Rows go here */}
        <div className={styles.header}>
          <h1 className={`${styles.menuTitle} golden-text`}>Our Menu</h1>
          <p className={styles.menuDescription}>
            Explore our exquisite Mediterranean dishes made with passion and
            authenticity.
          </p>
        </div>
        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.tabButton} ${
                activeCategory === cat ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.menuRows}>
          <div className={styles.menuColumn}>
            {menuItems
              .filter(
                (item) =>
                  activeCategory === "All" || item.category === activeCategory
              )
              .slice(0, Math.ceil(menuItems.length / 2))
              .map((item) => (
                <div key={item.id} className={styles.menuItem}>
                  <div className={styles.itemHeader}>
                    <h3 className={`${styles.itemTitle} golden-text`}>
                      {item.title}
                    </h3>
                    <span className={styles.itemPrice}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>{item.description}</p>
                  <button
                    className={styles.addButton}
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
          <div className={styles.menuColumn}>
            {menuItems
              .filter(
                (item) =>
                  activeCategory === "All" || item.category === activeCategory
              )
              .slice(Math.ceil(menuItems.length / 2))
              .map((item) => (
                <div key={item.id} className={styles.menuItem}>
                  <div className={styles.itemHeader}>
                    <h3 className={`${styles.itemTitle} golden-text`}>
                      {item.title}
                    </h3>
                    <span className={styles.itemPrice}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className={styles.itemDesc}>{item.description}</p>
                  <button
                    className={styles.addButton}
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}