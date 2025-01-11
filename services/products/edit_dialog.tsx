import React, { useState, useEffect } from "react";
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Product } from "./crud_product.ts"; // Adjust import based on your path

type EditProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductEdited: () => void;
  product: Product | null;
};

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onClose,
  onProductEdited,
  product,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    actionUrl: "",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        category: product.category,
        price: product.price.toString(),
        actionUrl: product.actionUrl,
        img: product.img,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setIsLoading(true);

    try {
      const productRef = doc(db, "products", product.id); // Update collection name to "products"
      await updateDoc(productRef, {
        productName: formData.productName,
        category: formData.category,
        price: parseFloat(formData.price),
        actionUrl: formData.actionUrl,
        img: formData.img,
      });
      onProductEdited();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
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
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the product information.</DialogDescription>
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
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Label htmlFor="img">Image URL</Label>
            <Input
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </div>
          <div className="py-2">
            <Label htmlFor="actionUrl">Action URL</Label>
            <Input
              id="actionUrl"
              name="actionUrl"
              value={formData.actionUrl}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter className="py-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
