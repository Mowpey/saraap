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
import { Product } from "./crud_product.ts";

type EditProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductEdited: () => void;
  product: Product | null;
  storeId: string;  // Add storeId prop
  storeName: string;  // Add storeName for display purposes
};

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onClose,
  onProductEdited,
  product,
  storeId,
  storeName,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        category: product.category,
        price: product.price.toString(),
        img: product.img,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setIsLoading(true);

    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        productName: formData.productName,
        category: formData.category,
        price: parseFloat(formData.price),
        img: formData.img,
        storeId: storeId,  // Ensure storeId is included in update
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
          <DialogDescription>
            Update the product information for {storeName}
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