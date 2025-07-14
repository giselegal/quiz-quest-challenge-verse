/**
 * PropertyGroup - Componente para agrupar propriedades relacionadas
 * 
 * Usa Card do Shadcn UI com headers e descrições
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  variant?: 'default' | 'secondary';
  className?: string;
}

export function PropertyGroup({
  title,
  description,
  children,
  defaultExpanded = true,
  collapsible = true,
  variant = 'default',
  className
}: PropertyGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!collapsible) {
    return (
      <Card className={cn('mb-4', className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('mb-4', className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {title}
                </CardTitle>
                {description && (
                  <CardDescription className="text-xs mt-1">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-2">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

/**
 * PropertyField - Wrapper para campos individuais
 */
interface PropertyFieldProps {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function PropertyField({
  label,
  description,
  error,
  children,
  required = false,
  className
}: PropertyFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="space-y-1">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

/**
 * PropertySection - Para seções maiores dentro de grupos
 */
interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PropertySection({
  title,
  children,
  className
}: PropertySectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-1">
        {title}
      </h4>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
