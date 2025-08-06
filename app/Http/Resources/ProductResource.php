<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        // This will include all attributes and loaded relations as arrays
        $data = parent::toArray($request);

        // Add your computed or formatted fields
        $data['images'] = $this->getMedia('images')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getFullUrl(),
                'thumb' => $media->getFullUrl('thumb'),
            ];
        });

        return $data;
    }
}
