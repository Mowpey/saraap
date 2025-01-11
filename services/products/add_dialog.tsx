import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";

type AddProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
};

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const newProduct = {
        productName: formData.productName,
        category: formData.category,
        price: parseFloat(formData.price),
        img: formData.img,
      };

      await addDoc(productsRef, newProduct);
      onProductAdded();
      onClose();
      setFormData({ productName: "", category: "", price: "", img: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="py-2">
            <Label htmlFor="img">Product Image URL</Label>
            <Input
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter className="py-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
